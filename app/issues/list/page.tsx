import Pagination from '@/app/components/Pagination';
import prisma from '@/prisma/client';
import { Status } from '@prisma/client';
import IssueActions from './IssueActions';
import IssueTable, { columnNames, IssueQuery } from './IssueTable';
import { Flex } from '@radix-ui/themes';

interface Props {
  searchParams: { status: Status }
}

const page = async ({
  searchParams
}: {
  searchParams: IssueQuery;
}) => {

  
  // console.log(searchParams.status)
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;
  
  const where = {
    status,
  }
  // console.log(statuses);

  const orderBy = columnNames
    .includes(searchParams.orderBy) ?  {[searchParams.orderBy]: 'asc'} : undefined;
  
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  
  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page-1) * pageSize,
    take: pageSize
  });

  const issueCount = await prisma.issue.count({
    where
  });
  // await delay(2000);

  return (
    <Flex direction='column' gap='3'>
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues}/>
    <Pagination
      pageSize={pageSize}
      currentPage={page}
      itemCount={issueCount}
      />
    </Flex>
  )
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default page
