import { useRef, useState } from "react"
import getGitRepo from "./api-config";

export default function App() {
  const [allRepos, setallRepos] = useState([]);

  const repoUrl = useRef(null);
  let getRepoInfo = async () => {
    let url = repoUrl.current.value;
    let [owner, repo] = url.split('/');
    let response = await getGitRepo(owner, repo);
    let repoDetails = response.data;
    setallRepos([...allRepos, repoDetails]);
    console.log(allRepos);
    // console.log(
    //   repoDetails,
    //   repoDetails.owner.avatar_url,
    //   repoDetails.full_name,
    //   repoDetails.description,
    //   repoDetails.stargazers_count,
    //   repoDetails.forks_count,
    // );

    repoUrl.current.value = ''; // clear value
  }

  return (
    <div className="main-container">
      <h1>Compare Wars</h1>
      <input type="text" ref={repoUrl} />
      <button onClick={() => getRepoInfo()}>Add for Comparison</button>
      <div className="contents-container">
        {
          allRepos.map((repo, rIdx) =>
            <div className="card" key={rIdx}>
              <img src={repo.owner.avatar_url} />
              <div className="repo-url">
                {repo.full_name}
              </div>
              <p>
                {repo.description}
              </p>
              <div className="data-row">
                Stars ⭐: {repo.stargazers_count}
              </div>
              <div className="data-row">
                Forks 🍴: {repo.forks_count}
              </div>
            </div>
          )
        }

      </div>

    </div>
  )
}
