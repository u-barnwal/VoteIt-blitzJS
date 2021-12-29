import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getQuestion from "app/questions/queries/getQuestion"
import deleteQuestion from "app/questions/mutations/deleteQuestion"
import updateChoice from "app/choices/mutations/updateChoice"

export const Question = () => {
  const router = useRouter()
  const questionId = useParam("questionId", "number")

  const [question, { refetch }] = useQuery(getQuestion, { id: questionId })
  const [deleteQuestionMutation] = useMutation(deleteQuestion)
  const [updateChoiceMutation] = useMutation(updateChoice)

  const handleVote = async (id: number, votes: number) => {
    try {
      await updateChoiceMutation({
        id,
        votes: ++votes,
      })

      refetch()
    } catch (e) {
      alert("Error: " + JSON.stringify(e, null, 2))
    }
  }

  return (
    <>
      <Head>
        <title>Question {question.id}</title>
      </Head>

      <div>
        <h1>Question {question.id}</h1>

        <h3>{question.text}</h3>

        {question?.hasMany?.map(({ id, text, votes }, index) => (
          <li key={index} style={{ marginBottom: "1rem" }}>
            <b>{text}:</b> {votes} votes &nbsp; | &nbsp;{" "}
            <button onClick={() => handleVote(id, votes)}>Vote</button>
          </li>
        ))}

        <Link href={Routes.EditQuestionPage({ questionId: question.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteQuestionMutation({ id: question.id })
              router.push(Routes.QuestionsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowQuestionPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.QuestionsPage()}>
          <a>Questions</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Question />
      </Suspense>
    </div>
  )
}

ShowQuestionPage.authenticate = true
ShowQuestionPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowQuestionPage
