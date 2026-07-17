import { useState } from "react";
import { getSubjectStatistic } from "../../services/reportService";
import { Select, notification, Spin } from 'antd';
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend,
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
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart width={600} height={300} data={chartData}>
                            <XAxis dataKey="level" stroke="#8884d8" />
                            <YAxis />
                            <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
                            <Legend
                                width={100}
                                wrapperStyle={{
                                    top: 40,
                                    right: 20,
                                    backgroundColor: '#f5f5f5',
                                    border: '1px solid #d5d5d5',
                                    borderRadius: 3,
                                    lineHeight: '40px',
                                }}
                            />
                            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                            <Bar dataKey="count" fill="#8884d8" barSize={30} />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </Spin>
        </>
    )
}

export default Reports;