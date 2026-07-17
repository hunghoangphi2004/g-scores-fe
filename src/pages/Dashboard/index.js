import { useEffect, useState } from "react";
import { getTop10GroupA } from "../../services/dashboardService";
import { Table, Tag, notification, Card } from "antd";


function Dashboard() {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            setLoading(true);

            const response = await getTop10GroupA();

            setData(response.data);
        } catch (error) {
            notification.error({
                message: "Warning",
                placement: "topRight",
            });
        } finally {
            setLoading(false);
        }
    }
    
    const columns = [
        {
            title: "Hạng",
            render: (_, __, index) => {
                if (index === 0) return "🥇";
                if (index === 1) return "🥈";
                if (index === 2) return "🥉";
                return index + 1;
            },
            width: 80,
            align: "center",
        },
        {
            title: "SBD",
            dataIndex: "sbd",
        },
        {
            title: "Toán",
            dataIndex: "toan",
            align: "center",
        },
        {
            title: "Vật lý",
            dataIndex: "vat_li",
            align: "center",
        },
        {
            title: "Hóa học",
            dataIndex: "hoa_hoc",
            align: "center",
        },
        {
            title: "Tổng điểm",
            dataIndex: "total",
            align: "center",
            render: (value) => (
                <Tag color="gold">{value.toFixed(2)}</Tag>
            ),
        },
    ];

    return (
        <Card title="Top 10 học sinh giỏi nhất nhóm A">
            <Table
                rowKey="sbd"
                dataSource={data}
                columns={columns}
                loading={loading}
                pagination={false}
                scroll={{ x: "max-content" }}
            />
        </Card>
    );
}

export default Dashboard;