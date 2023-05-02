export const saveAnswers = (answers) => {

    return fetch(`https://survey-tool-spring-production.up.railway.app/answers`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.values(answers))
    })
        .then(response => response.json())
        .catch(error => console.error(error));
      
};