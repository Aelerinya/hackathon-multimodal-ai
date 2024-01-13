
async function receivePhoto(form: FormData) {
    "use server"

    console.log(form);

}

export default function Stylist({
    params,
    searchParams,
}: {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    return (
        <>
            <h1>My Page</h1>
            <form action={receivePhoto}>
                <input type="file" name="photo" id="photo-id" /><br />
                <input className="border-2 rounded" type="submit" name="send" value="Send" />
            </form></>
    )
}