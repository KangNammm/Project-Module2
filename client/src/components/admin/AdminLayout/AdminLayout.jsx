import React from "react";
import AdminSider from "../AdminSider/AdminSider";
import { Layout } from "antd";
import AdminHeader from "../AdminHeader/AdminHeader";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <>
      <Layout>
        <AdminSider />
        <Layout>
          <AdminHeader />
          <Outlet />
        </Layout>
      </Layout>
    </>
  );
}
