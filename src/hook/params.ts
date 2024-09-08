
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export class Param {
    searchParams = useSearchParams()
    router = useRouter()
    pathname = usePathname()

    params = new URLSearchParams(this.searchParams);


    setParam = (paramKey: string, paramValue: string): void => {
        this.params.set(paramKey, paramValue)
        this.router.replace(this.pathname + '?' + this.params.toString())
    }

    getParam = (paramKey: string): string | null => {
        return this.params.get(paramKey)
    }

    deleteParam = (paramKey: string): void => {
        this.params.delete(paramKey)
        this.router.replace(this.pathname + '?' + this.params.toString())
    }
}