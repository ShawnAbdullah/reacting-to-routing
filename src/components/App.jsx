import { useEffect, useState } from 'react';
import List from '../List';

class App extends Component {
    constructor(props) {
        super(props)

    this.state = {
        films: [],
        heightChange: 0,
        opacityChange: 0,
    }

    this.slide = this.slide.bind(this);
    this.slideBack = this.slideBack.bind(this);
    this.sort = this.sort.bind(this);
}

componentDidMount() {
    fetch('https://ghibliapi.herokuapp.com/films/')
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            let newData = data.map(item => {
                // console.log(item);
                let imageObj = images.find(image => {
                    return item.id === image.id
                });
                if (!!imageObj) item.imageUrl = imageObj.url
                return item;
            });
            // console.log(newData);
            this.setState({ films: newData });
        });
}

slide() {

    //toggle for showing movie info
    const { open } = this.state

    open ? this.setState({
        open: false,
        heightChange: 0,
        opacityChange: 0
    }) : this.setState({
        open: true,
        heightChange: 100 + '%',
        opacityChange: 1
    })

    // console.log(this.state.open);
}

slideBack() {
    this.setState({
        heightChange: 0,
        opacityChange: 0
    })
}

sort(num) {
    function compareValues(key, order = 'asc') {
        return function (a, b) {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                // property doesn't exist on either object
                return 0;
            }

            //ternary operator to check the type of the key parameter
            const varA = (typeof a[key] === 'string') ?
                a[key].toUpperCase() : a[key];
            const varB = (typeof b[key] === 'string') ?
                b[key].toUpperCase() : b[key];

            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            } else if (varA < varB) {
                comparison = -1;
            }
            return (
                (order === 'desc') ? (comparison * -1) : comparison
            );
        };
    }
    let arr = this.state.films;
    console.log(arr);

    //conditional to delineate sorting types
    if (num === 1) {
        arr.sort(compareValues('title'));
        //console.dir('after sort: ' + arr[2].title);

        this.setState({
            films: arr
        })
    } else if (num === 2) {
        arr.sort(compareValues('title', 'desc'));

        this.setState({
            films: arr
        })
    } else if (num === 3) {
        arr.sort(compareValues('release_date'));

        this.setState({
            films: arr
        })
    } else if (num === 4) {
        arr.sort(compareValues('release_date', 'desc'));

        this.setState({
            films: arr
        })
    } else {
        console.log('sorting error');
    }

}

render() {
    // console.log(this.state.films);
    return (
        <div className="App">
            <h2 className="App-header">
                React API Fetch - Studio Ghibli API
            </h2>

            <div id="instructions-container">
                <h2 className="instructions">
                    ***click movie image to see info***
                </h2>
            </div>

            <div className="card-container">
                <List slideBack={this.slideBack} slide={this.slide} films={this.state.films} height={this.state.heightChange} opacity={this.state.opacityChange} transition={this.state.transition} />
            </div>

        </div>
    );
}
}

//     useEffect(() => {
//         fetch('https://ghibliapi.herokuapp.com/films')
//         .then(response => response.json())
//         .then(allUsers => setUsers(allUsers))
//     }, []);

//     return (
//         <main className="container">
//             <section className="row justify-content-center mt5-5">
//             {users.map(user =>(
//                 <div className="col-md-6" key={`user-card-${user.id}`}>
//                     <div className="card shadow my-2">
//                         <div className="card-body">
//                             <h4 className="card-title">{user.username}</h4>
//                             <p className="card-subtitle text-muted">{user.name}</p>
//                             <p className="card-text">{user.email}</p>
//                         </div>
//                     </div>
//                 </div>
//             ))}
//             <h1>hello there! </h1>
//             </section>
//         </main>
//     );
// };
export default App;