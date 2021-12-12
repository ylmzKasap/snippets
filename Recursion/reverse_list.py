def reverse_list(lst):
    if len(lst) == 1:
        return [lst[0]]
    else:
        return [lst[-1]] + reverse_list(lst[:-1])

a = [1, 2, 3, 4, 5]
print(reverse_list(a))