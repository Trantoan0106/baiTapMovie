import z from "zod";



export const loginSchema = z.object({
    taiKhoan: z.string.min(1, "vui lòng nhập tài khoản"),
    matKhau: z.string.min(1 , "vui lòng nhập mật khẩu"),
})