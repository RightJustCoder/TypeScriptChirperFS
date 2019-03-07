import * as React from 'react';
import ChirpCard from './chirpcard'
import { string } from 'prop-types';

export interface IListProps {

}
export interface IListState {
    chirps: { id: string; user: string; chirptext: string; }[]
    user: string;
    chirptext: string;
}

class List extends React.Component<IListProps, IListState> {
    constructor(props: IListProps) {
        super(props);
        this.state = { chirps: [], user: undefined, chirptext: undefined }

        this.handleSubmit = this.handleSubmit.bind(this)
    }


    async componentDidMount() {
        try {
            let r = await fetch('/api/chirps');
            let data = await r.json();
            let chirps = Object.keys(data).map(key => {
                return {
                    id: key,
                    user: data[key].user,
                    chirptext: data[key].chirptext
                }

            })
            chirps.pop()
            chirps.reverse()
            this.setState({ chirps })
        } catch (e) {
            console.log(e)
        }
    }

    async handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
        if (this.state.chirptext && this.state.user) {
            let data = {
                user: this.state.user,
                chirptext: this.state.chirptext
            };

            e.preventDefault();
            try {
                await fetch("/api/chirps", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(data)
                });
            } catch (e) {
                console.log(e);
            }
            location.reload();
        }
    }


    render() {
        return (
            <div className="bg-secondary p-2 ">
                <h1>Chirps Me Baby</h1>
                <div>
                    <h1>One More Time</h1>
                </div>

                <div className="col-md-12">
                    <form className="form-group"
                        onSubmit={this.handleSubmit} >
                        <label>Username</label>
                        <input type="text" placeholder="Username" className="form-control"
                            value={this.state.user}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                this.setState({ user: e.target.value })
                            }>
                        </input>
                        <label>Chirp</label>
                        <input type="text" placeholder="Chirp" className="form-control"
                            value={this.state.chirptext}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                this.setState({ chirptext: e.target.value })
                            }>
                        </input>
                        <button className="btn btn-dark mt-2 ">BATON !</button>
                    </form>
                    <div className="col-md-12 m-2 p-5 bg-light ">
                        {this.state.chirps.map(chirp => {
                            return (<ChirpCard key={chirp.id} chirp={chirp} />);

                        })}
                    </div>
                </div>
            </div>
        )
    }
}








export default List