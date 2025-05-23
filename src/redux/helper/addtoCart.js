import {toast} from "react-hot-toast";///
import {useSelector} from "react-redux";
import {useRouter} from "next/navigation";

export const addToCartHandler = (cartItem) => {
    const router = useRouter()
    const {currentUser} = useSelector(state=>state.User)
    // const cartItem = {
    //     email: currentUser?.email,
    //     product_id: product._id,
    //     product,
    //     variant: variant || product?.variant[0],
    //     price,
    // };
    const old = localStorage.getItem("cart");
    const old_cart = JSON.parse(old);
    const isExist =
        old_cart?.filter(
            (dt) =>
                dt?.product_id === cartItem.product_id && dt?.email === cartItem.email
        )?.length > 0;
    if(!isExist){
        if (old) {
            const new_cart = [...old_cart, cartItem];
            localStorage.setItem("cart", JSON.stringify(new_cart));
            router.push('/cart')
        } else {
            const new_cart = [cartItem];
            localStorage.setItem("cart", JSON.stringify(new_cart));
            router.push('/cart')
        }
    }
    else{
        toast.error("This Product Already Added On Cart")
        router.push('/cart')

    }
};
