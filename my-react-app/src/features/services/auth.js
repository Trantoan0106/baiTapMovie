import {authPost} from  "../http.js";

export const login = (payload) => authPost("/api/QuanLyNguoiDung/DangNhap" , payload);
export const register = (payload) => authPost("/api/QuanLyNguoiDung/DangKy" , payload);