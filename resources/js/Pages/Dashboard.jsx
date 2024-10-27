import React from 'react'
import Layout from '@/Layouts/Layout';
import DashboardCard from '@/Components/DashboardCard';
import { RiMailSendLine } from "react-icons/ri";
import { TbMailDown } from "react-icons/tb";
import { TbMailUp } from "react-icons/tb";
import { FaMailBulk } from "react-icons/fa";
import MailChart from '@/Components/MailChart';

const Dashboard = () => {
  return (
      <Layout>
          <div className="w-full grid grid-cols-3 gap-6 mb-6">
              <DashboardCard
                  title={"All Mail"}
                  icon={<RiMailSendLine size={20} />}
                  point={200}
                  description={"Total number of letters successfully archived"}
              />
              <DashboardCard
                  title={"Incoming mail"}
                  icon={<TbMailDown size={22} />}
                  point={200}
                  description={"Total number of incoming mail"}
              />
              <DashboardCard
                  title={"Outgoing mail"}
                  icon={<TbMailUp size={22} />}
                  point={200}
                  description={"Total number of outgoing mail"}
              />
          </div>
          <hr className="border border-blue-400 border-opacity-20" />
          <div className="w-full grid grid-cols-3 gap-6 mt-6">
              <DashboardCard
                  title={"Makanan"}
                  icon={<FaMailBulk size={20} />}
                  point={200}
                  description={"Kategori Makanan"}
              />
              <DashboardCard
                  title={"Minuman"}
                  icon={<FaMailBulk size={22} />}
                  point={200}
                  description={"Kategori Minuman"}
              />
              <DashboardCard
                  title={"Obat"}
                  icon={<FaMailBulk size={22} />}
                  point={200}
                  description={"Kategori Obat"}
              />
          </div>
          {/* <div className="w-full mt-10">
              <MailChart />
          </div> */}
      </Layout>
  );
}

export default Dashboard
