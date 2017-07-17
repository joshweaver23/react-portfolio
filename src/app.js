import React from 'react';
import PropTypes from 'prop-types';

export class App extends React.Component {

	constructor( props ) {
		super( props );
		this.state = {
			buyItems: ['milk', 'bread', 'bananas'],
			message: ''
		}
	}

	addItem(e) {
		e.preventDefault();
		const { buyItems } = this.state;
		const newItem = this.newItem.value;

		if ( buyItems.includes( newItem ) ) {
			this.setState( { 
				message: 'This item is already on the list.'
			 } )
		} else {
			newItem !== '' && this.setState( {
				buyItems: [ ...this.state.buyItems, newItem ],
				message: ''
			} )
		}

		this.addForm.reset();
	}

	removeItem( item ) {
		const newBuyItems = this.state.buyItems.filter( buyItem => {
			return buyItem !== item;
		} )

		this.setState( {
			buyItems: [ ...newBuyItems ]
		} )

		if ( newBuyItems.length === 0 ) {
			this.setState( {
				message: 'No items on your list, add some.'
			} )
		}
	}

	removeAll() {
		this.setState( {
			buyItems: [],
			message: 'No items on your list, add some.'
		} )
	}

	render() {
		const { buyItems, message } = this.state;
		return (
			<div className="container">
				<div className="col-md-6 col-md-offset-3">
					<header>
						<img src={ require( './images/shopping-cart.png' ) } alt="shopping cart" />
						<h1 className="text-center">Shopping List</h1>
	
						<form ref={ input => this.addForm = input } className="form-inline text-center" onSubmit={ e => this.addItem( e ) }>
							<div className="form-group">
								<label htmlFor="newItemInput" className="sr-only">Add New Item</label>
								<input ref={ input => this.newItem = input } type="text" placeholder="item to add" id="newItemInput" className="form-control"/>
							</div>
							<button className="btn btn-primary" type="submit">Add Item</button>
						</form>
					</header>

					<div className="content">
						{
							( message !== '' || buyItems.length === 0 ) && <p className="message text-danger">{ message }</p>
						}
						{
							buyItems.length > 0 &&
							<table className="table table-condensed text-center">
							<caption>Shopping List</caption>
							<thead>
								<tr>
									<th className="text-center">#</th>
									<th className="text-center">Item</th>
									<th className="text-center">Action</th>
								</tr>
							</thead>
							<tbody>
								{
									buyItems.map( ( item, index ) => {
										return (
											<tr key={ index }>
												<td>{ index + 1 }</td>
												<td>{ item }</td>
												<td>
													<button onClick={ e => this.removeItem( item ) } type="button" className="btn btn-default btn-sm">Remove</button>
												</td>
											</tr>
										)
									} )
								}
							</tbody>
							<tfoot>
								<tr>
									<td colSpan="2">&nbsp;</td>
									<td><button onClick={ e => this.removeAll() } className="btn btn-default btn-sm">Clear All</button></td>
								</tr>
							</tfoot>
						</table>
						}
					</div>
				</div>
			</div>
		)
	}
}
