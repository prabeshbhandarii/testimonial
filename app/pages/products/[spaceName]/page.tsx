import AppbarClient from "@/app/components/AppbarClient";
import PrivateRoute from "@/app/components/PrivateRoute";
import ProductSpace from "@/app/components/ProductSpace";

export default function Page(){
 return (
    <PrivateRoute>
        <AppbarClient />
        <ProductSpace />
    </PrivateRoute>
 )   
}