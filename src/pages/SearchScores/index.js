import { Card, Button, Form, Input, Space, Descriptions, Empty, notification } from "antd";
import './SearchScores.scss';
import { getScoreBySbd } from "../../services/scoreService";
import { useState} from "react";

function SearchScores() {

    const [sbd, setSbd] = useState(null);
    const [score, setScore] = useState({});
    const [loading, setLoading] = useState(false);

    const handleClickButton = async (values) => {
        try {
            setLoading(true);

            const response = await getScoreBySbd(values.sbd);

            if (response.success) {
                setScore(response.score);
                setSbd(values.sbd);
            } else {
                setScore({})
                notification.error({
                    message: "Warning",
                    description: response.message,
                    placement: "topRight",
                    style: {
                        width: 300,
                    },
                });
            }
        } catch (error) {
            notification.error({
                message: "Warning",
                placement: "topRight",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Card
                title="User Registration"
                className="search-scores__card"
            >
                <Form layout="vertical" onFinish={handleClickButton}>
                    <Form.Item
                        name="sbd"
                        label="Registration Number"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập số báo danh",
                            },
                            {
                                pattern: /^\d+$/,
                                message: "Số báo danh chỉ được chứa chữ số",
                            },
                        ]}
                    >
                        <Space.Compact className="search-scores__input">
                            <Input placeholder="Enter registration number" />
                            <Button color="default" variant="solid" htmlType="submit" loading={loading}>
                                Submit
                            </Button>
                        </Space.Compact>
                    </Form.Item>
                </Form>
            </Card>

            <Card
                title="Detailed Scores"
                loading={loading}
            >
                {Object.keys(score).length === 0 ? (
                    <Empty description="No data" />
                ) : (
                    <Descriptions
                        bordered
                        column={{
                            xs: 1,
                            sm: 1,
                            md: 2,
                            lg: 2,
                            xl: 2,
                            xxl: 2
                        }}
                    >
                        <Descriptions.Item label="SBD" span={2}>
                            {score.sbd}
                        </Descriptions.Item>

                        <Descriptions.Item label="Toán">
                            {score.toan ?? "-"}
                        </Descriptions.Item>

                        <Descriptions.Item label="Ngữ văn">
                            {score.ngu_van ?? "-"}
                        </Descriptions.Item>

                        <Descriptions.Item label="Ngoại ngữ">
                            {score.ngoai_ngu ?? "-"}
                        </Descriptions.Item>

                        <Descriptions.Item label="Mã ngoại ngữ">
                            {score.ma_ngoai_ngu}
                        </Descriptions.Item>

                        <Descriptions.Item label="Vật lý">
                            {score.vat_li ?? "-"}
                        </Descriptions.Item>

                        <Descriptions.Item label="Hóa học">
                            {score.hoa_hoc ?? "-"}
                        </Descriptions.Item>

                        <Descriptions.Item label="Sinh học">
                            {score.sinh_hoc ?? "-"}
                        </Descriptions.Item>

                        <Descriptions.Item label="Lịch sử">
                            {score.lich_su ?? "-"}
                        </Descriptions.Item>

                        <Descriptions.Item label="Địa lý">
                            {score.dia_li ?? "-"}
                        </Descriptions.Item>

                        <Descriptions.Item label="GDCD">
                            {score.gdcd ?? "-"}
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </Card>
        </>
    );
}

export default SearchScores;