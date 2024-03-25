import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button, Link } from '@radix-ui/themes'

const EditIssueButton = ({issueId}:{issueId: number}) => {
  return (
    <div>
        <Button>
                <Pencil2Icon/>
                <Link href={`/issues/edit/${issueId}/edit`}>Edit Issue</Link>
        </Button>
    </div>
  )
}

export default EditIssueButton
