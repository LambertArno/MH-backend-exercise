const functions = {
    kadane: (array) => {
        let max_so_far = 0, max_ending_here = 0;
        let allNegatives = true;

        for (let i = 0; i < array.length; i++) {
            max_ending_here = max_ending_here + array[i];

            if (max_ending_here < 0) max_ending_here = 0;
            if (max_so_far < max_ending_here) max_so_far = max_ending_here;

            if (array[i] > 0) allNegatives = false;
        }

        if (allNegatives) {
            return array.reduce(function(a, b) {
                return Math.max(a, b);
            });
        } else {
            return max_so_far;
        }
    },

    findMaxSum: (matrix) => {
        const cols = matrix[0].length;
        const rows = matrix.length;
        let maxSum = 0;

        for (let left = 0; left < cols; left++) {
            let temp = [];
            for(let i = 0; i < cols; i++) {
                temp.push(0);
            }

            for (let right = left; right < cols; right++) {
                for (let i = 0; i < rows; i++) {
                    temp[i] += matrix[i][right];
                }
                let sum = functions.kadane(temp);
                if (sum > maxSum) maxSum = sum;
            }
        }
        
        return maxSum;
    },
};

module.exports = functions;