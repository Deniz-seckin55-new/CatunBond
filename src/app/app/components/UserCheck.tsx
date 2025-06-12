import { useRouter } from "next/router";

const UserCheck: React.FC = () => {
    const router  = useRouter();

    fetch('/api/v1/app/checkUser').then((res) => res.json()).then((data) => {
        if(data.redirect) {
            router.push(data.redirect);
        }
    });

    return <></>;
}

export default UserCheck;