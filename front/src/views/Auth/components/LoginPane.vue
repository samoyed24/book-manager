<script setup lang="ts">
import { postCheckDuplicated, postLogin } from '@/api/auth'
import { APIError } from '@/api/wrapper'
import logo from '@/assets/logo.png'
import { FormItem } from '@/components/Base/CustomForm.vue'
import { useUserAuthStore } from '@/stores/auth'
import { ElMessage } from 'element-plus'
import { AuthFormData } from 'types/api'
import { useRouter } from 'vue-router'

const userAuth = useUserAuthStore()
const router = useRouter()

const defaultLoginGetter: () => AuthFormData = () => {
    return {
        username: '',
        password: '',
    }
}

const submitLoading = ref(false)

const formItems: FormItem<AuthFormData>[] = [
    {
        label: '用户名',
        prop: 'username',
        input: {
            type: 'input',
            placeholder: '请输入用户名',
        },
    },
    {
        label: '密码',
        prop: 'password',
        input: {
            type: 'input',
            showPassword: true,
            placeholder: '请输入密码',
        },
    },
]

const validationRules = {
        username: [
            {
                required: true,
                message: '请输入用户名',
                trigger: 'blur',
            },
        ],
        password: [
            {
                required: true,
                message: '请输入密码',
                trigger: 'blur',
            },
        ]
    }

const handleLogin = async (loginData: AuthFormData) => {
    try {
        submitLoading.value = false
        const resp = await postLogin(loginData)
        ElMessage.success('登录成功')
        if (resp.data) {
            userAuth.setUser(resp.data)
        }
        router.push('/panel/dashboard')
    } catch (err) {
        if (err instanceof APIError) {
            ElMessage.error(err.errMsg)
        }
    } finally {
        submitLoading.value = true
    }
}
</script>
<template>
    <el-tab-pane label="登录" name="login" class="full login-pane">
        <div class="full center login-container">
            <div class="full separate-container center">
                <el-image style="width: 160px;" :src="logo" fit="scale-down" />
            </div>
            <div class="full separate-container">
                <custom-form 
                :form-items="formItems"
                :default-getter="defaultLoginGetter"
                :submit="{
                    method: handleLogin,
                    // submitLoading,
                    submitText: '登录',
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
.separate-container {
    flex: 1
}
</style>