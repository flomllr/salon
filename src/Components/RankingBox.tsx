import * as React from 'react';
import { Header, Card } from 'semantic-ui-react'
import PersonCard from './PersonCard';
import UIButton from './UIButton';

const RankingBox = (props: any) => {
    return (
        <Card>
            <Header as="h1">Your Ranking</Header>
            <div>Rank the people in the order of who you want to speak to the most. We'll match you with them if there's mutual interest :) </div>
            <PersonCard ranking={1} name="Tyrone" photo="https://images.unsplash.com/photo-1520451644838-906a72aa7c86?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=474&q=80" />
            <PersonCard ranking={2} name="Daniel" photo="https://images.unsplash.com/photo-1520451644838-906a72aa7c86?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=474&q=80"/>
            <PersonCard ranking={3} name="Nicolas" photo="https://images.unsplash.com/photo-1520451644838-906a72aa7c86?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=474&q=80" />
            <UIButton text="End my speaking turn" />
        </Card>
    );
};

export default RankingBox