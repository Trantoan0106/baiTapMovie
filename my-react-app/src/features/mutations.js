import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login , register } from "./services/auth";




export function useLogin(){

const queryClient = useQueryClient();
return useMutation({
mutationFn: login,
retry: false,
onSuccess:(data) => {
    queryClient.setQueryData(["me"] , data );
},
});
}

export function useRegister(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: register,
        retry: false,
        onSuccess: (variables) => {
            queryClient.setQueryData(["me"] , {taiKhoan: variables.taiKhoan , matKhau: variables.matKhau , email: variables.email , soDt: variables.soDt , maNhom: variables.maNhom , hoTen: variables.Hoten} ) 
        }
    })
}