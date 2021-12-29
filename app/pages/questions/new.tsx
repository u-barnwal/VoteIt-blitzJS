import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createQuestion from "app/questions/mutations/createQuestion"
import { QuestionForm, FORM_ERROR } from "app/questions/components/QuestionForm"
import createChoice from "app/choices/mutations/createChoice"

const NewQuestionPage: BlitzPage = () => {
  const router = useRouter()
  const [createQuestionMutation] = useMutation(createQuestion)
  const [createChoiceMutation] = useMutation(createChoice)

  return (
    <div>
      <h1>Create New Question</h1>

      <QuestionForm
        submitText="Create Question"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateQuestion}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const question = await createQuestionMutation({
              text: values.text,
            })

            await createChoiceMutation({
              text: values.choice1,
              questionId: question.id,
            })

            await createChoiceMutation({
              text: values.choice2,
              questionId: question.id,
            })

            await createChoiceMutation({
              text: values.choice3,
              questionId: question.id,
            })

            router.push(Routes.ShowQuestionPage({ questionId: question.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.QuestionsPage()}>
          <a>Questions</a>
        </Link>
      </p>
    </div>
  )
}

NewQuestionPage.authenticate = true
NewQuestionPage.getLayout = (page) => <Layout title={"Create New Question"}>{page}</Layout>

export default NewQuestionPage
