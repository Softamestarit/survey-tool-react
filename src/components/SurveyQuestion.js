import React, { useState } from 'react';
import { useTable } from 'react-table';

export default function SurveyQuestion({ question }) {
  const [answer, setAnswer] = useState(null);

  const columns = React.useMemo(
    () => [
      {
        Header: question.content,
        accessor: 'option',
      },
    ],
    []
  );

  const data = React.useMemo(
    () =>
      question.options.map((option) => {
        return {
          option: option.content,
        };
      }),
    [question.options]
  );

  const tableInstance = useTable({ columns, data });

  return (
    <div>
      <h3>{question.content}</h3>
      <table {...tableInstance.getTableProps()}>
        <tbody>
          {tableInstance.rows.map((row) => {
            tableInstance.prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>
                      <label>
                        <input
                          type="radio"
                          name="answer"
                          value={cell.row.index}
                          checked={answer === cell.row.index}
                          onChange={() => setAnswer(cell.row.index)}
                        />
                        {cell.render('Cell')}
                      </label>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}