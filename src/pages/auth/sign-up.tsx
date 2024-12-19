import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { Helmet } from "react-helmet-async"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from "sonner"
import { Link } from "react-router-dom"

const signUpForm = z.object({
    restaurantName: z.string(),
    managerName: z.string(),
    phone: z.string(),
    email: z.string().email(),
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignUpForm>()

    async function handleSignUp(data: SignUpForm) {

        try {

            await new Promise(resolve => setTimeout(resolve, 2000))

            // toast.success('Enviamos um link de autenticação para seu e-mail.', {
            //     action: {
            //        label: 'Reenviar',
            //        onClick: () => handleSignUp(data)
            //     }
            // })
        } catch {
            toast.error("credenciais inválidas")
        }
    }

    return (
        <>
            <Helmet title="Cadastro" />
            <div className="p-8">
                <Button variant='secondary' asChild className="absolute top-8 right-8">
                    <Link to="/sign-in" className="text-sm text-muted-foreground">Fazer login</Link>
                </Button>
                <div className="w-[350px] flex flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tighter">Criar conta grátis</h1>
                        <p className="text-sm text-muted-foreground">Seja um parceiro e comece suas vendas!</p>
                    </div>

                    <form action="" className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
                        <div className="space-y-2">
                            <Label htmlFor="email">Seu e-mail</Label>
                            <Input id="email" type="email" {...register("email")} />
                        </div>

                        <Button disabled={isSubmitting} className="w-full" type="submit">Finalizar cadastro</Button>
                    </form>
                </div>
            </div>
        </>
    )
}