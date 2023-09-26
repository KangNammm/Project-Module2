import React from 'react'
import Header from '../../../components/user/header/Header'

export default function Contact() {
  return (
    <>
      <Header />
      <h1>Contact Page</h1>
      <table className="position-fixed z-[500] admin-table rounded-xl">
        <thead>
          <tr className="text-start">
            <th>Tên bài hát</th>
            <th>Ca sĩ</th>
            <th>Thời lượng</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td>cccc</td>
              <td>dd</td>
              <td>bbbb</td>
            </tr>
        </tbody>
      </table>
    </>
  );
}
