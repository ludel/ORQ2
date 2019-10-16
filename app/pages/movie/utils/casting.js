import {h, Component} from 'preact';
import ObjectLine from "../../../components/objectLine";


class Casting extends Component {
    * getByDepartment(department, credits) {
        for (const credit of credits)
            if (credit.department === department)
                yield credit
    }

    render(props) {
        return (
            <div>
                <div class="casting-line">
                    <h5>Réalisation</h5>
                    {Array.from(this.getByDepartment('Directing', props.credits.crew)).slice(0,5).map(
                        e => <ObjectLine profile-path={e.profile_path} name={e.name} character={e.job} href={`/person/${e.id}`}/>
                    )}
                </div>

                <div class="casting-line">
                    <h5>Acteurs</h5>
                    {props.credits.cast.slice(0, 8).map(
                        e => <ObjectLine profile-path={e.profile_path} name={e.name} character={e.character} href={`/person/${e.id}`}/>
                    )}
                </div>

                <div className="casting-line">
                    <h5>Scénario</h5>
                    {Array.from(this.getByDepartment('Writing', props.credits.crew)).slice(0,5).map(
                        e => <ObjectLine profile-path={e.profile_path} name={e.name} character={e.job} href={`/person/${e.id}`}/>
                    )}
                </div>

                <div class="casting-line">
                    <h5>Musique</h5>
                    {Array.from(this.getByDepartment('Sound', props.credits.crew)).slice(0,5).map(
                        e => <ObjectLine profile-path={e.profile_path} name={e.name} character={e.job} href={`/person/${e.id}`}/>
                    )}
                </div>

                <div class="casting-line">
                    <h5>Production</h5>
                    {Array.from(this.getByDepartment('Production', props.credits.crew)).slice(0,5).map(
                        e => <ObjectLine profile-path={e.profile_path} name={e.name} character={e.job} href={`/person/${e.id}`}/>
                    )}
                </div>

            </div>
        )
    }
}

export default Casting
