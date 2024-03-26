import prisma from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import delay from 'delay';
import IssueActions from './IssueActions';
import { IssueStatusBadge, Link } from '@/app/components';
import { Issue, Status } from '@prisma/client';
import NextLink from 'next/link';
import { ArrowUpIcon } from '@radix-ui/react-icons';

interface Props {
  searchParams: { status: Status }
}

const page = async ({
  searchParams
}: {
  searchParams: { status: Status, orderBy: keyof Issue };
}) => {

  const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
      { label: 'Issue', value: 'title', className: "hidden md:table-cell" },
      { label: 'Status', value: 'status', className: "hidden md:table-cell" },
      { label: 'Created', value: 'createdAt', className: "hidden md:table-cell" },
    ]
  // console.log(searchParams.status)
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;
  // console.log(statuses);

  const orderBy = columns
    .map(column => column.value)
    .includes(searchParams.orderBy) ?  {[searchParams.orderBy]: 'asc'} : undefined;
  
  
  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
    orderBy
  });
  // await delay(2000);

  return (
    <div>
      <IssueActions />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
          {columns.map(column => (<Table.ColumnHeaderCell key={column.value}>
                <NextLink href={{query: {...searchParams, orderBy: column.value}}}>{column.label}</NextLink>
                  {column.value === searchParams.orderBy && <ArrowUpIcon className='inline' /> }
              </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Link href={`/issues/${issue.id}`}>
                {issue.title}
              </Link>
              <div className="block md:hidden">
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.Cell>
            <Table.Cell className='hidden md:table-cell'>
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
          </Table.Row>
        )))}
      </Table.Body>
    </Table.Root>
    </div >
  )
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default page
