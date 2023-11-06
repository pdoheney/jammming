import './App.css';
import Header from './Components/Header/Header';
import SearchBar from './Components/SearchBar/SearchBar';
import SearchResults from './Components/SearchResults/SearchResults';

const searchResults = [
  {name: 'Song 1', artist: 'Singer 1', album: 'Album 1', uri: 'kdhwbvwi'},
  {name: 'Song 2', artist: 'Singer 1', album: 'Album 1', uri: 'qvqevrvq'},
  {name: 'Song 3', artist: 'Singer 2', album: 'Album 1', uri: 'qrvqeere'},
  {name: 'Song 4', artist: 'Singer 3', album: 'Album 2', uri: 'qrvqdvre'},
];

function App() {
  return(
    <>
      <Header />
      <SearchBar />
      <div>
        <SearchResults searchResults={searchResults}/>
      </div>
    </>
  );
}

export default App;
