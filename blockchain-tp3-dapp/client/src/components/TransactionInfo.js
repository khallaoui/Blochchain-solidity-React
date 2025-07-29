// client/src/components/TransactionInfo.js
import React from 'react';
import { Card, Badge } from 'react-bootstrap';

const TransactionInfo = ({ transaction }) => {
  if (!transaction) return null;

  return (
    <Card>
      <Card.Header>Dernière Transaction</Card.Header>
      <Card.Body>
        <p><strong>Hash:</strong></p>
        <small className="text-muted">{transaction.transactionHash}</small>
        
        <p className="mt-2"><strong>Gas utilisé:</strong> {transaction.gasUsed}</p>
        
        <p><strong>Statut:</strong> 
          <Badge variant={transaction.status ? "success" : "danger"} className="ml-2">
            {transaction.status ? "Succès" : "Échec"}
          </Badge>
        </p>
        
        <p><strong>Bloc:</strong> {transaction.blockNumber}</p>
      </Card.Body>
    </Card>
  );
};

export default TransactionInfo;