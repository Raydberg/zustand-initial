import { Fragment, useEffect, useState } from "react"
import { tesloApi } from "../../../api/tesloApi"
import { AuthService } from "../../../services/auth.service"

export const RequestInfo = async () => {

    const [info, setInfo] = useState()

    // useEffect(() => {
    //     setInfo(await AuthService.infoPrivate())
    // }, [])



    return (
        <Fragment>
            <h2>Informacion</h2>
            <pre>
                {
                    JSON.stringify(info, null, 2)
                }
            </pre>
        </Fragment>
    )
}
