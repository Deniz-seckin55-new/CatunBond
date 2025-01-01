import { useRouter } from "next/router";

const UserCheck: React.FC = () => {
    fetch('/api/v1/app/checkUser').then((res) => res.json()).then((data) => {
        if(data.redirect) {
            useRouter().push(data.redirect);
        }
    });

    return <></>;
}

export default UserCheck;