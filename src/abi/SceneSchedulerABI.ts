export function getSceneSchedulerAddress(chainId: number) : string {
	//if(chainId == 3) return "0x540d803Dc1565bcb91b3D0BB50Fa1ab6196dfe5f"; // Ropsten Test Network - Deprecated 2022 Sep
	if(chainId == 5) return "0xDae1C48919e9282c36297DCb4b859f3D6966d674"; // Goerli Test Network
	else alert("Only Goerli test network is avaliable now.")
	return "";
}
export const SceneSchedulerABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_startTimestamp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_endTimestamp",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_data",
				"type": "string"
			}
		],
		"name": "createSchedule",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "newScheduleId",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "scheduleIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "newStartTimestamp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "newEndTimestamp",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "newData",
				"type": "string"
			}
		],
		"name": "modifySchedule",
		"outputs": [
			{
				"internalType": "contract Schedule",
				"name": "newSchedule",
				"type": "address"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "scheduleId",
				"type": "uint256"
			}
		],
		"name": "removeSchedule",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "newValue",
				"type": "uint256"
			}
		],
		"name": "setChangeScheduleLimitSeconds",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "newValue",
				"type": "uint256"
			}
		],
		"name": "setCreateScheduleLimitSeconds",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "newFeeWeiPerSecond",
				"type": "uint256"
			}
		],
		"name": "setFee",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "searchStartTimestamp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "searchEndTimestamp",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "onlyMine",
				"type": "bool"
			}
		],
		"name": "_getScheduleIds",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "balance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getChangeScheduleLimitSeconds",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCreateScheduleLimitSeconds",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getEarliestStartingHourTimestamp",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "earliestStartTimestamp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getEarliestStartingHourTimestampWithPresentTimestamp",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "earliestStartTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "timestampNow",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getFeePerDay",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "weiPerDay",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getFeePerHour",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "weiPerHour",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getFeePerMinute",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "weiPerMinute",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getFeePerSecond",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "weiPerSecond",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "searchStartTimestamp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "searchEndTimestamp",
				"type": "uint256"
			}
		],
		"name": "getMyScheduleIds",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "searchStartTimestamp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "searchEndTimestamp",
				"type": "uint256"
			}
		],
		"name": "getMySchedules",
		"outputs": [
			{
				"internalType": "contract Schedule[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPresentScheduleStartingTimestamp",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getScheduleDetail",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "startTimestamp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "endTimestamp",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "booker",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "data",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "paidEth",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "removed",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_startTimestamp",
				"type": "uint256"
			}
		],
		"name": "getScheduleId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "searchStartTimestamp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "searchEndTimestamp",
				"type": "uint256"
			}
		],
		"name": "getScheduleIds",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getScheduleNow",
		"outputs": [
			{
				"internalType": "bool",
				"name": "scheduleExist",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "startTimestamp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "endTimestamp",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "booker",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "data",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "paidEth",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "removed",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "searchStartTimestamp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "searchEndTimestamp",
				"type": "uint256"
			}
		],
		"name": "getSchedules",
		"outputs": [
			{
				"internalType": "contract Schedule[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTimestampNow",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]