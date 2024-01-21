//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract L2Contract {
    string private greeting;
    address l1Contract;
    address l2Bridge;

    error NotL2Bridge();

    constructor(address _l1Contract, address _l2Bridge) {
      l1Contract = _l1Contract;
      l2Bridge = _l2Bridge;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        if(msg.sender!=l2Bridge){
          revert NotL2Bridge();
        }
        greeting = _greeting;
    }
}
