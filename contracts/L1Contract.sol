//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./IMessageService.sol";

contract L1Contract {
    address l1Bridge;

    constructor(address _l1Bridge) {
      l1Bridge = _l1Bridge;
    }

    function sendMessageToL2(address _to, uint256 _fee, bytes memory _calldata) public {
      IMessageService bridge = IMessageService(l1Bridge);
      bridge.sendMessage(
        _to,
        _fee,
        _calldata
      );
    }
}
