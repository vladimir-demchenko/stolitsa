import { Button, Checkbox, Input, Popover, Select } from 'antd';
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
  PaginationState,
  useReactTable,
} from '@tanstack/react-table';

import { useGetUsers } from '../api/adminApi';

import cls from './Admin.module.scss';
import dayjs from 'dayjs';


export function Admin() {
  const { data } = useGetUsers(null);

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
        header: 'birthday',
        accessorKey: 'birthday',
        cell: (props) => <span>{dayjs(props?.getValue() as string).locale('ru').format('DD.MM.YYYY')}</span>
      },

    ],
    []
  );

  const defaultData = useMemo(() => [], []);

  const table = useReactTable({
    data: data ?? defaultData,
    columns,

    getCoreRowModel: getCoreRowModel(),
  });



  const exportToXlsx = () => {
    // @ts-ignore
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const file = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([file]), 'Пользователи.xlsx');
  };

  const content = (
    <div className={cls.popoverContent}>
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

  return (
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
      </div>
    </div>
  );
}
