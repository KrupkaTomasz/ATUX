import React from 'react';

class Homepage extends React.Component{  

    render (){
        return (
            <div>
                <h1 className = "text-center">Home</h1>
                <br></br><br></br><br></br>
                <p>Ta aplikacja webowa została zaprogramowana jako zadanie rekrutacyjne dla jednej z firm.</p>
                <p>Posiada ona stronę startową o nazwie "Home", stronę "Formularz", na której można wgrać plik XML z danymi użytkowników, </p>
                <p>oraz stronę "Lista", na której użytkowników tych można wyświetlić.</p>
                <p>Przełączanie pomiędzy stronami znajduje się w prawym górnym rogu aplikacji.</p>
                <br></br><br></br><br></br><br></br><br></br>
                <p>Aby wgrać plik XML z danymi można równiesz skorzystać z przycisku poniżej.</p>
                <br></br><br></br>

                <a href="/form"><button class="button-24">Wgraj XML</button></a>
            </div>               
        )
    }              
}
  
export default Homepage