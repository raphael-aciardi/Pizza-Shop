import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { Helmet } from "react-helmet-async"
import { useForm } from  'react-hook-form'
import {z} from 'zod'
import { Link } from 'react-router-dom'
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"
import { signIn } from "@/api/sign-in"

const signInForm = z.object({
    email: z.string().email(),
})

type SignInForm = z.infer<typeof signInForm>

export function SingIn() {
    const {register, handleSubmit, formState: { isSubmitting}} = useForm<SignInForm>()

    const { mutateAsync : authenticate } = useMutation({
        mutationFn: signIn,
        
    })

    async function handleSignIn(data: SignInForm) {

        try {

            await authenticate({ email : data.email })

            toast.success('Enviamos um link de autenticação para seu e-mail.', {
                action: {
                   label: 'Reenviar',
                   onClick: () => handleSignIn(data)
                }
            })
        } catch {
            toast.error("credenciais inválidas")
        }
    }

    return (
        <>
            <Helmet title="Login" />
            <div className="p-8">
                <Button variant='secondary' asChild className="absolute top-8 right-8">
                    <Link to="/sign-up">
                        Novo estabelecimento
                    </Link>
                </Button>
                <div className="w-[350px] flex flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tighter">Acessar painel</h1>
                        <p className="text-sm text-muted-foreground">Acompanhe suas vendas pelo painel do parceiro!</p>
                    </div>

                    <form action="" className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
                        <div className="space-y-2">
                        <Label htmlFor="email">Seu e-mail</Label>
                        <Input id="email" type="email" {...register("email")} />
                        </div>

                        <Button disabled={isSubmitting} className="w-full" type="submit">Acessar painel</Button>
                    </form>
                </div>
            </div>
        </>
    )
}