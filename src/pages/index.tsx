import useFetch from "../hooks/useFetch";

const Wordly = () => {
  const {word, isLoading} = useFetch();
  return (
    <div>
      <pre>
        {isLoading ? 'Loading...' : word}
      </pre>
    </div>
  )
}
export default Wordly;