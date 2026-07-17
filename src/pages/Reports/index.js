import { useState } from "react";
import { getSubjectStatistic } from "../../services/reportService";
import { Select, notification, Spin, Row, Col } from "antd";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend,
    PieChart,
    Pie,
    Cell,
} from "recharts";

function Reports() {

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    const handleSelectSubject = async (subject) => {
        try {
            setLoading(true);

            const response = await getSubjectStatistic(subject);
            console.log(response)

            setData(response.result);
        } catch (error) {
            notification.error({
                message: "Warning",
                placement: "topRight",
            });
        } finally {
            setLoading(false);
        }
    }

    const chartData = [
        {
            level: ">= 8",
            count: data.greaterEqual8 || 0,
        },
        {
            level: "6 - 8",
            count: data.from6To8 || 0,
        },
        {
            level: "4 - 6",
            count: data.from4To6 || 0,
        },
        {
            level: "< 4",
            count: data.lowerThan4 || 0,
        },
    ];

    const COLORS = [
        "#52c41a",
        "#1890ff",
        "#faad14",
        "#ff4d4f",
    ];

    return (
        <>
            <Select
                onChange={handleSelectSubject}
                placeholder="Select a subject"
                style={{ width: 250, marginBottom: 24 }}
                options={[
                    { value: "toan", label: "Toán" },
                    { value: "ngu_van", label: "Văn" },
                    { value: "ngoai_ngu", label: "Ngoại ngữ" },
                    { value: "vat_li", label: "Vật lí" },
                    { value: "hoa_hoc", label: "Hoá học" },
                    { value: "sinh_hoc", label: "Sinh học" },
                    { value: "lich_su", label: "Lịch sử" },
                    { value: "dia_li", label: "Địa lí" },
                    { value: "gdcd", label: "GDCD" },
                ]}
            />

            <Spin spinning={loading}>
                {data.subject && (
                    <Row gutter={[24, 24]}>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={chartData}>
                                    <XAxis dataKey="level" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Bar
                                        dataKey="count"
                                        fill="#1677ff"
                                        barSize={30}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <ResponsiveContainer width="100%" height={400}>
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        dataKey="count"
                                        nameKey="level"
                                        outerRadius={120}
                                        label={({ percent }) =>
                                            `${(percent * 100).toFixed(1)}%`
                                        }
                                    >
                                        {chartData.map((_, index) => (
                                            <Cell
                                                key={index}
                                                fill={COLORS[index]}
                                            />
                                        ))}
                                    </Pie>

                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </Col>
                    </Row>
                )}
            </Spin>
        </>
    )
}

export default Reports;