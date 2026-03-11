<script setup lang="ts">
import { postCheckDuplicated, postLogin, postRegister } from '@/api/auth'
import { APIError } from '@/api/wrapper'
import logo from '@/assets/logo.png'
import CustomForm, { FormItem } from '@/components/Base/CustomForm.vue'
import { facultyOptions, gradeOptions } from '@/constants/user'
import { useUserAuthStore } from '@/stores/auth'
import { validateMethodGenerator } from '@/util/user'
import { ElMessage, FormRules } from 'element-plus'
import { RegisterFormData } from 'types/api'
import { useRouter } from 'vue-router'

const userAuth = useUserAuthStore()
const router = useRouter()

const defaultRegisterGetter: () => RegisterFormData = () => {
    return {
        username: '',
        password: '',
        name: '',
        workNumber: '',
        idNumber: '',
        facultyName: '',
        major: '',
        grade: '',
    }
}

const formItems: FormItem<RegisterFormData>[] = [
    {
        label: '用户名',
        prop: 'username',
        input: {
            type: 'input',
            placeholder: '请输入用户名(4~16个字符)',
        },
    },
    {
        label: '密码',
        prop: 'password',
        input: {
            type: 'input',
            showPassword: true,
            placeholder: '请输入密码(8~32个字符)',
        },
    },
    {
        label: '姓名',
        prop: 'name',
        input: {
            type: 'input',
            placeholder: '请输入您的真实姓名',
        },
    },
    {
        label: '学号/工号',
        prop: 'workNumber',
        input: {
            type: 'input',
            placeholder: '请输入学号/工号',
        },
    },    
    {
        label: '身份证号',
        prop: 'idNumber',
        input: {
            type: 'input',
            placeholder: '请输入身份证号',
        },
    },    
    {
        label: '学院',
        prop: 'facultyName',
        input: {
            type: 'select',
            placeholder: '请选择您的学院',
            options: facultyOptions,
        },
    },    
    {
        label: '专业',
        prop: 'major',
        input: {
            type: 'input',
            placeholder: '请输入您的专业名称',
        },
    },    
    {
        label: '年级',
        prop: 'grade',
        input: {
            type: 'select',
            placeholder: '请选择您的年级',
            options: gradeOptions,
        },
    },
]

const customFormRef = ref<InstanceType<typeof CustomForm> | null>(null);
const validationRules: FormRules<RegisterFormData> = {
        username: [
            {
                required: true,
                message: '请输入用户名(4~16个字符)',
                trigger: 'blur',
            },
            {
                validator: validateMethodGenerator('username', '用户名'),
                trigger: 'blur',
            },
            {
                min: 4,
                message: '用户名需至少4个字符',
                trigger: 'blur', 
            },
            {
                max: 16,
                message: '用户名需最多16个字符',
                trigger: 'blur', 
            },
        ],
        password: [
            {
                required: true,
                message: '请输入密码(8~32个字符)',
                trigger: 'blur',
            },
            {
                min: 8,
                message: '密码需至少8个字符',
                trigger: 'blur', 
            },
            {
                max: 32,
                message: '密码需最多32个字符',
                trigger: 'blur', 
            },
        ],     
        name: [
            {
                required: true,
                message: '请输入您的姓名',
                trigger: 'blur',
            },
        ],   
        workNumber: [
            {
                required: true,
                message: '请输入学号/工号(12位数字)',
                trigger: 'blur',
            },
            {
                pattern: /^\d{12}$/,
                message: '请输入正确格式的学号/工号',
                trigger: 'blur',
            },
            {
                validator: validateMethodGenerator('workNumber', '学号/工号'),
                trigger: 'blur',
            }
        ],
        idNumber: [
            {
                required: true,
                message: '请输入身份证号',
                trigger: 'blur',
            },
            {
                pattern: /^(?:\d{15}|\d{17}(\d|X|x))$/,
                message: '请输入正确格式的身份证号',
                trigger: 'blur',
            },
            {
                validator: validateMethodGenerator('idNumber', '身份证号'),
                trigger: 'blur',
            }
        ],
        facultyName: [
            {
                required: true,
                message: '请选择您的学院',
                trigger: 'blur',
            },
        ],
    }

const handleRegister = async (registerData: RegisterFormData) => {
    try {
        const resp = await postRegister(registerData)
        ElMessage.success('注册成功，已经为您自动登录')
        customFormRef.value?.getFormDefault()
        if (resp.data) {
            userAuth.setUser(resp.data)
        }
        router.push('/panel/dashboard')
    } catch (err) {
        let _err = err as APIError
        ElMessage.error(_err.errMsg)
    }
}
</script>
<template>
    <el-tab-pane label="注册" name="register" class="full login-pane">
        <div class="full center login-container">
            <div class="image-container center">
                <el-image style="width: 160px;" :src="logo" fit="scale-down" />
            </div>
            <div class="full separate-container">
                <custom-form
                ref="customFormRef"
                :form-items="formItems"
                :default-getter="defaultRegisterGetter"
                :submit="{
                    method: handleRegister,
                    submitText: '注册',
                    validationRules: validationRules
                }"
                />
            </div>
        </div>
    </el-tab-pane>
</template>

<style scoped>
.login-form {
    width: 100%;   
}
.login-container {
    display: flex;
    flex-direction: column;
}
.image-container {
    flex: 2
}
.separate-container {
    flex: 10
}
</style>