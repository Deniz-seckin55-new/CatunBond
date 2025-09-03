import { useRouter } from "next/router";
import { useEffect } from "react";

const UserCheck: React.FC = () => {
    const router  = useRouter();

    useEffect(() => {
        fetch('/api/v1/app/checkUser').then((res) => res.json()).then((data) => {
                if(data.redirect) {
                    router.push(data.redirect);
                }
            });
    }, []);

    return <></>;
}

export default UserCheck;