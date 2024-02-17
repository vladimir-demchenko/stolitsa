import { Button, Checkbox, Input, Layout, Pagination, Popover, Select } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { saveAs } from 'file-saver';
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { api } from 'shared/api/api';
import { RoutePath } from 'shared/config/router';
import * as XLSX from 'xlsx';

import { DownloadOutlined, SearchOutlined } from '@ant-design/icons';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table';

import { useGetShiftsFilter, useGetUsers } from '../api/adminApi';

import cls from './Admin.module.scss';
import dayjs from 'dayjs';
import { AdminPage } from 'widgets/AdminPage';
import { useDebounce } from 'shared/lib/useDebounce';


export default function Admin() {
  const [{ approve_shift, shiftId, name, email, flag }, setFilter] = useState({ approve_shift: '', shiftId: '', name: '', email: '', flag: '' });
  const queryParams = approve_shift || shiftId || name || email || flag ? { approve_shift, shiftId, name, email, flag } : {};
  const { data, isLoading } = useGetUsers(queryParams);
  const { data: shiftFilter } = useGetShiftsFilter(null);
  const navigate = useNavigate();

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: 'id',
        cell: (props) => <div>{props.row.index + 1}</div>,
      },
      {
        header: 'Фамилия',
        accessorKey: 'lastname',
      },
      {
        header: 'Имя',
        accessorKey: 'firstname',
      },
      {
        header: 'Отчество',
        accessorKey: 'secondname',
      },
      {
        header: 'Логин',
        accessorKey: 'login',
      },
      {
        header: 'Дата рождения',
        accessorKey: 'birthday',
        cell: (props) => <span>{dayjs(props?.getValue() as string).locale('ru').format('DD.MM.YYYY')}</span>
      },
      {
        header: 'Смена',
        accessorFn: (originalRow) => originalRow?.shift?.title
      },
      {
        header: 'Смена подтверждена',
        accessorKey: 'approve_shift',
        cell: (props) => <span>{props?.getValue() as boolean ? 'Да' : 'Нет'}</span>
      }
    ],
    []
  );

  const defaultData = useMemo(() => [], []);

  const table = useReactTable({
    data: data ?? defaultData,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });



  const exportToXlsx = () => {
    const exportedData = { ...data, "birthday": dayjs(data.birthday).locale('ru').format('DD.MM.YYYY') };
    // @ts-ignore
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const file = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([file]), 'Пользователи.xlsx');
  };

  const handleUpdate = ({
    target: { id, value },
  }: ChangeEvent<HTMLInputElement>) => {
    setFilter((prev) => ({ ...prev, [id]: id === 'name' ? value.replace(/\s/g, '') : value }))
  }

  const handleUpdateDebounced = useDebounce(handleUpdate, 500);

  const content = (
    <div className={cls.popoverContent}>
      <Select
        allowClear
        placeholder='Подтверждение заявки'
        onChange={(value) => setFilter((prev) => ({ ...prev, approve_shift: value }))}
        options={[
          { value: 'true', label: 'Заявка подтвержденна' },
          { value: 'false', label: 'Заявка не подтвержденна' }
        ]}
      />
      <Select
        allowClear
        style={{ width: '100%' }}
        placeholder='Смена'
        onChange={(value) => setFilter((prev) => ({ ...prev, shiftId: value }))}
        options={shiftFilter?.map((shift: any) => ({ value: shift.id, label: shift.title }))}
      />
      <Input
        placeholder='ФИО'
        id='name'
        onChange={handleUpdateDebounced}
      />
      <Input
        placeholder='Email'
        id='email'
        onChange={handleUpdateDebounced}
      />
      <Select
        allowClear
        placeholder='Маркер'
        onChange={(value) => setFilter((prev) => ({ ...prev, flag: value }))}
        options={[
          { value: 'true', label: 'Да' },
          { value: 'false', label: 'Нет' }
        ]}
      />
      <Button className={cls.button} onClick={exportToXlsx}>
        Экспортировать
      </Button>
    </div>
  );

  // const clubsOptions = useMemo(
  //   () =>
  //     clubs?.rows?.map((club: any) => ({
  //       label: club.name,
  //       value: club.id,
  //     })),
  //   [clubs]
  // );

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <AdminPage>
      <div className={cls.pageWrapper}>
        <div className={cls.filterWrapper}>
          <div className={cls.filterInputs}>
            {content}
          </div>
        </div>
        <div className={cls.tableWrapper}>
          <table className={cls.table}>
            <thead className={cls.thead}>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className={cls.header}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className={cls.tbody}>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={cls.row}
                  onClick={() => navigate(`/admin/users/${row.original.id}`)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className={cls.cell}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination showSizeChanger onShowSizeChange={(_, size) => table.setPageSize(size)} current={table.getState().pagination.pageIndex + 1} total={data?.length} onChange={(page) => table.setPageIndex(page - 1)} />
        </div>
      </div>
    </AdminPage>
  );
}
