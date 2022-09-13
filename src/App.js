import React, { useState } from 'react';
// ELK APP Search
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import { ErrorBoundary, Facet, SearchProvider, SearchBox, Results, PagingInfo, ResultsPerPage, Paging, WithSearch } from "@elastic/react-search-ui";
import { Layout } from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
// Css Custom for ELK App Search
import "../src/components/search/search.css";
import searchUi from '../src/img/searchUi.svg';
// POPUP Module
import Popup from "./components/popupFeedback/Popup.jsx";
import { Rating } from 'react-simple-star-rating';
//React PDF 
import PDFReader from "./components/PDFViewer/PDFReader";
import "../src/App.css";



// connector App Search
const connector = new AppSearchAPIConnector({
  searchKey: "search-7gg64ik9tiv18xg16ywjbh35",
  engineName: "merge-canton-thales-qpm-toutella-frontend",
  endpointBase: "https://entreprise-search-bot.recf.elk.si2m.tec"
});

// Configuration App Search
const config = {
  debug: true,
  alwaysSearchOnInitialLoad: true,
  apiConnector: connector,
  hasA11yNotifications: true,
  searchQuery: {
    search_fields: {
      // section search field for searchbar
      title: {},
      content: {}
    },
    result_fields: {
      // section result field
      title: { 
          snippet: {
            fallback: true
        } 
      },
       nps_link: {
         raw: {}
       },
       content: {
         snippet: {
           size: 1000, 
           fallback: true
         }
       },
       page: {
        raw: {}
       },
       origine: {
        raw: {}
       },
       grand_compte: {
        raw: {}
       }
    },  
    disjunctiveFacets: [""],
    facets: {
      // section facet parameter
      facet: { type: "value" },
      origine: { type: "value" },
      grand_compte: { type: "value" },   
      creation_date: {
        type: "range",
        ranges: [
          {
            to: '2020-01-01T01:01:33.420Z',
            name: "Anciens documents"
          },
          {
            from: '2021-01-01T01:01:33.420Z',
            to: '2021-12-31T23:59:33.420Z',
            name: "Documents en 2021"
          },
          {
            from: '2022-01-01T01:01:33.420Z',
            to: '2022-12-31T23:59:33.420Z',
            name: "Documents en 2022"
          },
          {
            from: '9998-01-01T01:01:33.420Z',
            name: "Non précisé"
          }
        ]
      },
      modification_date: {
        type: "range",
        ranges: [
          {
            from: '2021-01-01T01:01:33.420Z',
            to: '2021-12-31T23:59:33.420Z',
            name: "Modifiés en 2021"
          },
          {
            from: '2022-01-01T01:01:33.420Z',
            to: '2022-12-31T01:01:33.420Z',
            name: "Modifiés cette année"
          },
          {
            to: '9998-01-01T01:01:33.420Z',
            name: "Non précisé"
          }
        ]
      },
    }
  }
};
// customizing Search-result HTML
const CustomResultView = (
  { result, onClickLink }: {
  result: SearchResult;
  onClickLink: () => void;
}) => (
  
<li className="sui-result">
  
  <div className="sui-result__header">
    <h3>
        {/* Maintain onClickLink to correct track click throughs for analytics*/}
        <a onClick={onClickLink} href={result.nps_link.raw} target="blank">
          {result.title.snippet}
        </a>
      </h3>
  </div>
    <div className="sui-result__body">
      {/* Use the 'snippet' property of fields with dangerouslySetInnerHtml to render snippets */}
      <div className="sui-result__details" dangerouslySetInnerHTML={{ __html: result.content.snippet }}>
      </div>
    </div>
    <div className="sui-result__button" >
    <button className="sui-result__button-page" type="button" alt="tag page bouton non cliquable" disabled> à la page {result.page.raw} </button>
      <button className="sui-result__button-origine" type="button" alt="tag origine bouton non cliquable" disabled>{result.origine.raw} </button>
      <button className="sui-result__button-grand_compte" type="button" alt="tag grand_compte bouton non cliquable" disabled>{result.grand_compte.raw} </button>
    </div>
</li>
); 

export default function App() {
  // Function popup
  const [buttonPopup, setButtonPopup] = useState(false);
  // function React star rating
  
  const Stars = () => {
  const [rating, setRating] = useState(0) // initial rating value

  // Catch Rating value
  const handleRating = (rate) => {
    console.log (rate)
    setRating(rate)
  }
    // other logic
    return (
      <div className='App'>
        <Rating onClick={handleRating} ratingValue={rating} /* Available Props */ />
      </div>
    )
  }
  return (
    <SearchProvider config={config}>
      <WithSearch
        mapContextToProps={({ wasSearched }) => ({
          wasSearched
        })}
      >
        {({ wasSearched }) => {
          return (
            <div className="App">
              <ErrorBoundary>
                <div className="sui-layout">
                  <div className="sui-layout-header">
                    <div className="sui-layout-header__inner">
                <Layout
                  header={
                    // Section header SearchBox 
                    <SearchBox
                    inputView={({ getAutocomplete, getInputProps, getButtonProps }) => (
                    <>
                    <div className="sui-search-box__wrapper-iconSearch">
                      <img src={searchUi} alt="icone recherche"></img>
                    </div>
                    <div className="sui-search-box__wrapper">
                      <input 
                        {...getInputProps ({ placeholder: "Je saisie ma recherche ici !"  }) }
                      />
                        {getAutocomplete({
                        "sectionTitle": "Suggested Results",
                        "titleField": "title",
                        "urlField": "nps_link", 
                        })
                      }
                    </div>
                    <input
                      {...getButtonProps({
                        
                        "data-custom-attr": "some value",
                        "value": "rechercher"
                        })
                      }
                    />
                    </>
                    )}
                    autocompleteResults={{
                      sectionTitle: "Suggested Results",
                      titleField: "title",
                      urlField: "nps_link",  
                      linkTarget:"blank"
                    }}
                    autocompleteSuggestions={
                      {
                        title: {
                        sectionTitle: "Suggested Queries",
                        },
                        popular_queries: {
                          sectionTitle: "Popular Queries"
                        } 
                      }} debounceLength={0} />
                  }
                  sideContent={
                  // lateral sidebar with feedback module popup
                  <div>
                    <div>
                        <button className="popup__button-feedback" onClick={() => setButtonPopup(true)}>Je donne mon avis !</button>
                        <div className="Popup">
                    <Popup trigger={buttonPopup} setTrigger=
                    {setButtonPopup}>
                    <h3 className="Popup__title">Mon Feedback</h3>
                    <p>Ton feedback est très important, il permet d'optimiser l'outil en <span className="popup__text-span">fonction de tes besoins.</span>
                      Je donne mon avis sur la réponse apportée.</p>
                    <form className="popup__form">
                    <select className="popup__form-select">
                      <option value="no-result">Je n'ai pas de résultat</option>
                      <option value="no-result">la réponse n'est pas dans le top 3</option>
                      <option value="no-result">le document n'est pas bon</option>
                    </select>
                    <label>Commentaire :</label><br />
                    <textarea className="popup__form-textArea" placeholder="Saisir mon commentaire..."></textarea><br />
                      <p> Je donne mon avis sur l'outil !</p>
                      <Stars className="popup__Stars"/>
                      <button className="popup__submit-Feedback" value="submit__feedback">Envoyer</button>
                    </form>
                    </Popup><br />
                   </div>
                   <Facet
                    field="grand_compte"
                    label="Grand compte"
                    filterType="any"
                    isFilterable={true}
                    />
                    <Facet
                    field="origine"
                    label="Origine"
                    filterType="any"
                    isFilterable={false}
                    />
                    <Facet
                    field="creation_date"
                    label="date de création"
                    filterType="any"
                    />
                    <Facet
                    field="modification_date"
                    label="date de modification"
                    filterType="any"
                    />
                    </div></div>}
                    // section body
                    bodyContent ={
                      // visionneuse pdf
                     <div class="container"> 
                     <div class="row"> 
                     <div class="searchbox">
                          <Results
                            resultView={CustomResultView}
                            titleField="title"
                            urlField="nps_link"
                            thumbnailField="image_url"
                            shouldTrackClickThrough={true}
                            />
                       </div>
                     <div class="pdfviewerbox">
                        <PDFReader />
                      </div>
                     </div></div>  
                  }
                  bodyHeader={
                    <React.Fragment>
                      {wasSearched && <PagingInfo />}
                      {wasSearched && <ResultsPerPage />}
                    </React.Fragment>
                  }
                  bodyFooter={<Paging />}
                />
              </div></div></div>
              </ErrorBoundary>
            </div>
          );
        }}
      </WithSearch>
    </SearchProvider>
  )
}
 
