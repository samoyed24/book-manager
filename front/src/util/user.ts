import { postCheckDuplicated } from "@/api/auth"

export const validateMethodGenerator = (field: string, alias: string) => {
    return (
        rule: any,
        value: string,
        callback: (error?: Error) => void
    ): void => {
    if (!value) {
        callback(new Error('请输入' + alias))
        return
    }

    postCheckDuplicated({
        field,
        value,
    })
        .then(({ data }) => {
        if (data?.isDuplicated) {
            callback(new Error(alias + '已存在'))
        } else {
            callback()
        }
        })
        .catch((err: any) => {
        callback(new Error(err?.errMsg || '验证失败，请稍后重试'))
        })
    }
}