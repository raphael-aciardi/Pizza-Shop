import { render } from "@testing-library/react"
import { Pagination } from "./pagination"
import { userEvent } from '@testing-library/user-event'


describe('pagination', () => {

    const onPageChangeCallback = vi.fn()

    beforeEach(() => {
        onPageChangeCallback.mockClear()
    })

    it('should display the right amount of pages and results', () => {
        
        

        const wrapper = render(
            <Pagination
                pageIndex={0}
                totalCount={200}
                perPage={10}
                onPageChange={() => { }}
            />
        )

        expect(wrapper.getByText("Página 1 de 20")).toBeInTheDocument()
        expect(wrapper.getByText("Total de 200 itens")).toBeInTheDocument()
    })


    it('should be able to navigate to the next page', async () => {
        const user = userEvent.setup()
        const wrapper = render(
            <Pagination
                pageIndex={0}
                totalCount={200}
                perPage={10}
                onPageChange={onPageChangeCallback}
            />
        )
        //console.log(onPageChangeCallback.mock.calls)

        const nextPageButton = wrapper.getByRole('button', {
            name: 'Próxima página'
        })

        await user.click(nextPageButton)

        //console.log(onPageChangeCallback.mock.calls)

        expect(onPageChangeCallback).toHaveBeenCalledWith(1)
    })

    it('should be able to navigate to the previous page', async () => {
        const user = userEvent.setup()
        const wrapper = render(
            <Pagination
                pageIndex={5}
                totalCount={200}
                perPage={10}
                onPageChange={onPageChangeCallback}
            />
        )

        const nextPageButton = wrapper.getByRole('button', {
            name: 'Página anterior'
        })

        await user.click(nextPageButton)

        expect(onPageChangeCallback).toHaveBeenCalledWith(4)


    })

    it('should be able to navigate to the first page', async () => {
        const user = userEvent.setup()
        const wrapper = render(
            <Pagination
                pageIndex={5}
                totalCount={200}
                perPage={10}
                onPageChange={onPageChangeCallback}
            />
        )

        const nextPageButton = wrapper.getByRole('button', {
            name: 'Primeira página'
        })

        await user.click(nextPageButton)

        expect(onPageChangeCallback).toHaveBeenCalledWith(0)


    })

    it('should be able to navigate to the last page', async () => {
        const user = userEvent.setup()
        const wrapper = render(
            <Pagination
                pageIndex={0}
                totalCount={200}
                perPage={10}
                onPageChange={onPageChangeCallback}
            />
        )

        const nextPageButton = wrapper.getByRole('button', {
            name: 'Última página'
        })

        await user.click(nextPageButton)

        expect(onPageChangeCallback).toHaveBeenCalledWith(19)

    })
})