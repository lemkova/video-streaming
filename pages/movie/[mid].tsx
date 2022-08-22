import { NextPage } from 'next'
import { useRouter } from 'next/router'

const Movie : NextPage = () => {
  const router = useRouter()
  const { mid } = router.query

  return <p>mid: {mid}</p>
}

export default Movie