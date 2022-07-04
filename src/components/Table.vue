<template>
    <div class="mt-5">
      <ControlPanel :functionCall="handleOpenCloseUserModal" />
        <div id="white-box" class="w-full">
            <Space>
                <div class="py-3">
                    <div id="control-panel" class="py-2 mt-2">
                        <Space>
                            <div class="flex flex-direction-row-column">
                                <div class="sides">
                                    <div id="search-icon-box" class="flex justify-center items-center">
                                        <SeachIcon />
                                    </div>
                                </div>
                                <div class="sides">
                                    <Pagination :range="[5, 10, 15]" :total="total" :page="page"
                                        :itemsPerPage="itemsPerPage" :handlePaginateNavigate="handlePaginateNavigate"
                                        :itemsPerCurrentPage="itemsPerCurrentPage"
                                    />
                                </div>
                            </div>
                        </Space>
                    </div>
                    <div v-if="loading" class="flex justify-center py-7">
                        <Loader />
                    </div>
                    <div style="overflow: auto;">
                        <table>
                        <tr id="table-top">
                            <th class="text-left">S/N</th>
                            <th class="text-left">NAME</th>
                            <th class="text-left">EMAIL</th>
                            <th class="text-left">PHONE NUMBER</th>
                            <th class="text-left">ACTIONS</th>
                        </tr>
                        <tr v-for="(i, index) in users.slice(start, end)" :key="i.id" class="user-info">
                            <td>{{ i.id }}</td>
                            <td>
                                <div class="flex">
                                    <div class="first-last pt-1">
                                        <span class="">
                                            {{ i.name.split(' ').map(name => name[0]).join('') }}
                                        </span>
                                    </div>
                                    <div class="pl-3 user-name">{{ i.name }}</div>
                                </div>
                            </td>
                            <td>{{ i.email }}</td>
                            <td>{{ i.phone }}</td>
                            <td>
                                <div class="flex">
                                    <button
                                        @click="handleSelectEdit(i.name.split(' ')[0], i.name.split(' ')[1], i.email, i.phone, index, i.id)">
                                        <Edit />
                                    </button>
                                    <div class="px-1"></div>
                                    <button @click="handleCloseConfirmModal(i.id)">
                                        <TrashIcon />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </table>
                    </div>
                    <div class="py-5">
                        <Pagination :range="[5, 10, 15]" :total="total" :page="page" :itemsPerPage="itemsPerPage"
                            :handlePaginateNavigate="handlePaginateNavigate"
                            :itemsPerCurrentPage="itemsPerCurrentPage"
                        />
                        <br />
                    </div>
                </div>
            </Space>
        </div>
        <Modal :isOpen="open">
            <div class="form-modal">
                <div id="top-bar" class="py-3">
                    <Space>
                        <div class="flex">
                            <div class="w-1/2">
                                <span id="top-title">{{editMode ? `Edit User - ${user[0].value} ${user[1].value}`:'Create New User(s)'}}</span>
                            </div>
                            <div class="w-1/2">
                                <button class="float-right" @click="handleOpenCloseUserModal">
                                    <CloseIcon />
                                </button>
                            </div>
                        </div>
                    </Space>
                </div>
                <div class="form-container pb-10">
                    <form @submit.prevent="handleCreateEditUser">
                        <div class="flex flex-direction-row-column mt-16">
                            <div class="sides px-2">
                                <div>
                                    <label>FIRST NAME*</label>
                                </div>
                                <div>
                                    <input
                                        class="input py-1 px-3 w-full mt-1" text="text"
                                        placeholder="Enter first name"
                                        v-model="user[0].value"
                                    />
                                </div>
                                <div class="mt-2">
                                    <label>EMAIL*</label>
                                </div>
                                <div>
                                    <input class="input py-1 px-3 w-full mt-1" text="email"
                                        placeholder="Enter first name" v-model="user[2].value" />
                                </div>
                            </div>
                            <div class="sides px-2">
                                <div>
                                    <label>LAST NAME*</label>
                                </div>
                                <div>
                                    <input class="input py-1 px-3 w-full mt-1" text="text"
                                        placeholder="Enter first name" v-model="user[1].value" />
                                </div>
                                <div class="mt-2">
                                    <label>PHONE NUMBER*</label>
                                </div>
                                <div>
                                    <input class="input py-1 px-3 w-full mt-1" text="text"
                                        placeholder="Enter first name" v-model="user[3].value" />
                                </div>
                            </div>
                        </div>
                        <div class="mt-16 w-full flex">
                            <div class="sides"></div>
                            <div class="sides">
                                <div class="float-right flex">
                                    <button
                                        v-if="editMode"
                                        id="delete-user-btn"
                                        type="button"
                                        class="px-3"
                                        @click="handleCloseConfirmModal(deleteId)"
                                    >Delete User</button>
                                    <div class="px-1"></div>
                                    <Button
                                        :label="editMode ? 'Save Changes':'Create New User'"
                                        color="#3399FF"
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
        <Modal :isOpen="confirm">
          <Confirm
            :handleCloseConfirmModal="handleCloseConfirmModal"
            :handleDeleteUser="handleDeleteUser"
         />
        </Modal>
        <Modal :isOpen="success">
          <Success :handleOpenCloseSuccess="handleOpenCloseSuccess" />
        </Modal>
    </div>
</template>

<script>
import axios from "axios";
import createUser from "../constants/user"
import Modal from "./Modal.vue";
import Space from "./Space.vue";
import CloseIcon from "./icons/Close.vue";
import Button from "./Button.vue";
import Confirm from "./Confirm.vue";
import Success from "./Success.vue";
import SeachIcon from "./icons/Search.vue";
import Edit from "./icons/Edit.vue";
import TrashIcon from "./icons/Trash.vue";
import Pagination from "./Pagination.vue";
import Loader from "./Loader.vue";
import ControlPanel from "./ControlPanel.vue";
import errorOptions from "../constants/error-options";

export default {
    data() {
        return {
            creatingUser: false,
            success: false,
            user: createUser,
            users: [],
            loading: false,
            start: 0,
            end: 5,
            total: 0,
            page: 1,
            itemsPerPage: 5,
            itemsPerCurrentPage: 0,
            value: 1,
            open: false,
            toastErrorOptions: errorOptions,
            confirm: false,
            deleteUserId: 0,
            editMode: false,
            editIndex: 0,
            deleteId: 0
        }
    },
    components: {
        Modal,
        Space,
        CloseIcon,
        Button,
        Confirm,
        Success,
        SeachIcon,
        Edit,
        TrashIcon,
        Pagination,
        Loader,
        ControlPanel
    },
    methods: {
        async handleGetUsers() {
            this.loading = true;
            try {
                const { data } = await axios.get("https://jsonplaceholder.typicode.com/users");
                this.users = data;
                this.loading = false;
                this.total = data.length;
                this.itemsPerCurrentPage = this.users.slice(this.start, this.end).length;
            } catch (error) {
                console.log(error)
                this.loading = false
            }
        },
        handleCreateEditUser() {
            // Edit User
             const validateEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (this.editMode === true) {
                for (const value of this.user) {
                    if (!value.value) {
                        this.$toast.error("Please fill in your " + value.field, this.toastErrorOptions);
                        return
                    }
                
                    if (!this.user[2].value.match(validateEmail)) {
                        this.$toast.error("Invalid email", this.toastErrorOptions);
                        return
                    }
               }
               
                this.users[this.editIndex].name = `${this.user[0].value} ${this.user[1].value}`;
                this.users[this.editIndex].email = this.user[2].value;
                this.users[this.editIndex].phone = this.user[3].value;
                this.success = true;
                this.handleOpenCloseUserModal();
                return
            }
            
            // Create user
            for (const value of this.user) {
              if (!value.value) {
                this.$toast.error("Please fill in your " + value.field, this.toastErrorOptions);
                return
              }
             
              if (!this.user[2].value.match(validateEmail)) {
                this.$toast.error("Invalid email", this.toastErrorOptions);
                return
              }

            }

            this.users.push({
               id: this.users.length + 1,
               name: `${this.user[0].value} ${this.user[1].value}`,
               email: this.user[2].value,
               phone: this.user[3].value
            });

            this.success = true;
            this.total = this.users.length;
            this.creatingUser = false;
            this.handleOpenCloseUserModal();
        },
        handleCloseConfirmModal(id) {
           if (id) {
            this.deleteUserId = id
           } else {
            this.id = 0
           }
           this.confirm = !this.confirm;
        },
        handleDeleteUser() {
            this.users = this.users.filter(i => i.id !== this.deleteUserId);
            this.handleCloseConfirmModal();
            this.handleOpenCloseSuccess();
            this.itemsPerCurrentPage = this.users.slice(this.start, this.end).length;
            this.total = this.users.length;
            console.log(this.users.slice(this.start, this.end).length)
        },
        handleOpenCloseSuccess() {
           this.success = !this.success
        },
        handleOpenCloseUserModal() {
            this.open = !this.open;
            if (this.editMode) {
                this.editMode = false;
                this.editIndex = 0;
                this.user[0].value = "";
                this.user[1].value = "";
                this.user[2].value = "";
                this.user[3].value = "";
            }
        },
        handlePaginateNavigate(value) {
            this.page = value;
            this.start = this.value * this.itemsPerPage * value - this.itemsPerPage;
            this.end = this.value * this.itemsPerPage * value;
            this.itemsPerCurrentPage = this.users.slice(this.start, this.end).length;
        },
        handleSelectEdit(firstName, lastName, email, phoneNumber, index, id) {
          this.open = true;
          this.editMode = true;
          this.editIndex = index;
          this.deleteId = id
          this.user[0].value = firstName;
          this.user[1].value = lastName;
          this.user[2].value = email;
          this.user[3].value = phoneNumber;
        },
    },
    mounted() {
        this.handleGetUsers()
    }
}
</script>

<style lang="scss" scoped>
#control-panel {
    background: #F1F2F5;
    border-radius: 4px;

    #search-icon-box {
        background: #FFFFFF;
        border: 1px solid #E1E5EE;
        border-radius: 2px;
        width: 35px;
        height: 35px;
    }
}

.form-modal {
    width: 90%;
    margin-left: 5%;
    background: white;
    @media (min-width: 1000px) {
        width: 60%;
        margin-left: 20%;
    }
    #top-bar {
        border-bottom: 1px solid #E1E5EE;

        #top-title {
            font-family: 'Open Sans';
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            line-height: 24px;
            color: gray;
        }
    }

    .form-container {
        width: 80%;
        margin-left: 10%;
    }
}

label {
    font-family: 'Open Sans Light';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 13px;
}

.input {
    border: 1px solid #C2C9D1;
    font-family: 'Open Sans Light';
    border-radius: 4px;
    outline: none;
    font-size: 12px;
    padding-top: 10px;
    padding-bottom: 10px;
}

table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
    margin-top: 15px;

    th {
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
        align-items: left;
        padding: 12px;
        color: #3b3a3a;
        @media (max-width: 400px) {
          width: 100%;
        }
        @media (max-width: 600px) {
           width: 100%;
        }
    }

    td {
        font-family: 'Open Sans Light';
        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        line-height: 24px;
        text-align: left;
        color: #3b3a3a;
        padding: 12px;
        @media (max-width: 600px) {
             width: 100%;
        }
    }
}

#table-top {
    background: #F8F9FA;
    border: 1px solid #E1E5EE;
}

.user-info {
    border: 2px solid #E1E5EE;
}

.first-last {
    background: #4780F8;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    color: white;
    font-size: 10px;
    text-align: center;

    span {
        font-size: 10px;
    }
}

.user-name {
    font-family: 'Open Sans Light';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    align-items: center;
    color: #0D3693;
}

#white-box {
    background: white;
}

#delete-user-btn {
  border: 1px solid #FF5F58;
  color: #FF5F58;
  border-radius: 5px;
  &:active {
    transform: scale(.9);
  }
}

.side {
  width: 100%;
  @media (min-width: 1000px) {
    width: 50%;
  }    
}
</style>
