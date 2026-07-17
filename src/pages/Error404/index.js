import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

function Error404() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/")
    }

    return (
        <Result
            status="404"
            title="404"
            subTitle="Đường dẫn không tồn tại"
            extra={
                <Button type="primary" onClick={handleClick}>
                    Về Dashboard
                </Button>
            }
        />
    );
}

export default Error404;